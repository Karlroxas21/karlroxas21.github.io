import WindowControls from '@components/WindowControls';
import { locations } from '@constants/index';
import WindowWrapper from '@hoc/WindowWrapper';
import useLocationStore, { type AppItem, type LocationKey } from '@store/fileLocation';
import useWindowStore from '@store/window';
import clsx from 'clsx';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    EllipsisVertical,
    FolderSearch,
    House,
    List,
    Menu,
    Search,
} from 'lucide-react';

const Sidebar = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { selectedWorkId, setSelectedWorkId } = useLocationStore();

    const renderLocationsList = Object.entries(locations).map(([key, item]) => (
        <li
            key={item.id}
            onClick={() => {
                setActiveLocation(key as LocationKey);
                setSelectedWorkId(null);
            }}
            className={clsx('flex gap-1 p-2 rounded-lg my-2 cursor-pointer', {
                'bg-[#4b4b4b]': key === activeLocation,
            })}>
            <img src={item.icon} className="w-4 text-white" alt={item.name} />
            <p className="text-sm font-medium truncate text-[#d6d6d6]">{item.name}</p>
        </li>
    ));

    const renderWorkList = locations.work.children.map(item => (
        <li
            key={item.id}
            onClick={() => {
                setSelectedWorkId(item.id);
                setActiveLocation('work' as LocationKey);
            }}
            className={clsx('flex gap-1 p-2 rounded-lg my-2 cursor-pointer', {
                'bg-[#4b4b4b]': selectedWorkId === item.id,
            })}>
            <img src={item.icon} className="w-4 text-white" alt={item.name} />
            <p className="text-sm font-medium truncate text-[#d6d6d6]">{item.name}</p>
        </li>
    ));

    return (
        <div className="bg-[#303030] h-auto w-2xl p-5">
            <div className="text-white flex justify-between">
                <Search size={18} className="hover:cursor-pointer" />
                <p>Files</p>
                <Menu size={18} className="hover:cursor-pointer" />
            </div>
            <div>
                <ul>{renderLocationsList}</ul>
            </div>

            <div>
                <hr className="text-white" />
                <ul> {renderWorkList} </ul>
            </div>
        </div>
    );
};

const Files = () => {
    const { activeLocation, selectedWorkId, setSelectedWorkId } = useLocationStore();
    const { openWindow } = useWindowStore();

    const openItem = (item: AppItem) => {
        if (item.fileType === 'pdf') return openWindow('resume', null);
        if (item.kind === 'folder') return setSelectedWorkId(item.id);
        if ((item.fileType === 'fig' || item.fileType === 'url') && item.href) return window.open(item.href, '_blank');

        console.log(`${item.fileType}${item.kind}`);
        openWindow(`${item.fileType}${item.kind}`, item);
    };
    return (
        <>
            <div className="flex bg-[#1f1e25]">
                <Sidebar />
                <div>
                    <div className="flex items-center justify-between px-4 py-2 gap-2 rounded-tr-md bg-[#1f1e25] select-none text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                            <ChevronLeft size={18} />

                            <ChevronRight size={18} />
                        </div>

                        <div className="flex items-center space-x-10">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-row items-center justify-between gap-1 w-140 bg-[#343434] rounded-md p-2">
                                    <div className="flex gap-1">
                                        <House size={18} className="text-white" />
                                        <p className="font-semibold text-white">Home</p>
                                    </div>
                                    <EllipsisVertical size={18} className="text-white" />
                                </div>
                                <FolderSearch size={18} />
                            </div>

                            <div className="flex items-center gap-1 ">
                                <List size={14} />
                                |
                                <ChevronDown size={18} />
                            </div>
                            <WindowControls target={'files'} />
                        </div>
                    </div>

                    <div className="px-5 text-white">
                        <ul className="grid grid-cols-7 space-x-5">
                            {selectedWorkId
                                ? // Find and display the selected work item
                                  locations.work.children
                                      .find(work => work.id === selectedWorkId)
                                      ?.children.map(item => (
                                          <li
                                              key={item.id}
                                              className={
                                                  'flex flex-col gap-2 justify-center items-center hover:cursor-pointer hover:bg-[#4b4b4b] transition rounded-lg p-2'
                                              }
                                              onClick={() => openItem(item as AppItem)}>
                                              <img
                                                  src={item.icon}
                                                  alt={item.name}
                                                  className="flex-1 size-full rounded-md object-contain"
                                              />
                                              <p className="flex-1 text-sm text-pretty">{item.name}</p>
                                          </li>
                                      ))
                                : // Display default location children
                                  locations[activeLocation].children.map(item => (
                                      <li
                                          key={item.id}
                                          className={
                                              'flex flex-col gap-2 justify-center items-center hover:cursor-pointer hover:bg-[#4b4b4b] transition rounded-lg p-2'
                                          }
                                          onClick={() => openItem(item as AppItem)}>
                                          <img
                                              src={item.icon}
                                              alt={item.name}
                                              className="flex-1 size-full rounded-md object-contain"
                                          />
                                          <p className="flex-1 text-sm text-pretty">{(item as AppItem).name}</p>
                                      </li>
                                  ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

const FilesWindows = WindowWrapper(Files, 'files');

export default FilesWindows;
