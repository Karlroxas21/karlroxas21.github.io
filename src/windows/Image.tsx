import WindowControls from '@components/WindowControls';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';

const ImageViewer = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;
    console.log('DATA: ', data);

    const { name, imageUrl } = data;
    return (
        <>
            <div id="window-header">
                <h2>{name}</h2>
                <WindowControls target="imgfile" />
            </div>
            <div className="flex items-center justify-center bg-[#1f1e25] text-[#d6d6d6] p-4 w-full">
                <img src={imageUrl} alt={name} className="h-auto max-h-[70vh] object-contain rounded" />
            </div>
        </>
    );
};

const ImageViewerWindow = WindowWrapper(ImageViewer, 'imgfile');

export default ImageViewerWindow;
