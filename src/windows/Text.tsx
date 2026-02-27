import WindowControls from '@components/WindowControls';
import WindowWrapper from '@hoc/WindowWrapper';
import useWindowStore from '@store/window';

const TextEditor = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, image, description, subtitle } = data;
    return (
        <>
            <div id="window-header">
                <h2>{name}</h2>
                <WindowControls target="txtfile" />
            </div>

            {image ? (
                <div className='w-full bg-[#1f1e25]'>
                    <img src={image} alt={name} className="w-full max-h-100 rounded object-contain" />
                </div>
            ) : null}

            {subtitle ? <p className="text-lg font-semibold bg-[#1f1e25] text-white p-4">{subtitle}</p> : null}

            {Array.isArray(description) && description.length > 0 ? (
                <div className="bg-[#1f1e25] text-[#d6d6d6] space-y-4 leading-relaxed p-4">
                    {description.map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
                </div>
            ) : null}
        </>
    );
};

const TextEditorWindow = WindowWrapper(TextEditor, 'txtfile');

export default TextEditorWindow;
