export function Posts() {
    return (
        <div>
            <section className="container mx-auto py-30">
                <h2 className="text-3xl font-bold mb-4">Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">Post Title 1</h3>
                        <p className="text-gray-700">This is a brief description of post 1.</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">Post Title 2</h3>
                        <p className="text-gray-700">This is a brief description of post 2.</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">Post Title 3</h3>
                        <p className="text-gray-700">This is a brief description of post 3.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}