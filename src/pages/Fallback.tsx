const Fallback = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Desktop Only</h1>
                <p className="text-lg text-gray-400">This experience is optimized for desktop and laptop screens.</p>
                <p className="text-sm text-gray-500 mt-4">Please view this site on a larger screen.</p>
            </div>
        </div>
    );
};

export default Fallback;
