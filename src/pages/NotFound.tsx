import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-6">
            <div className="text-center max-w-xl">
                <h1 className="text-8xl font-bold tracking-tight">404</h1>

                <p className="mt-4 text-xl text-neutral-300">The page you are looking for does not exist.</p>

                <p className="mt-2 text-neutral-500">It might have been moved, deleted, or the URL is incorrect.</p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition">
                        Go Home
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-lg border border-neutral-700 hover:border-neutral-500 transition">
                        Go Back
                    </button>
                </div>

                <div className="mt-16 text-neutral-700 text-sm">Error code: 404</div>
            </div>
        </div>
    );
};
