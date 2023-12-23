import React from 'react';

const PostsPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div></div>
                <div className={"col-span-3"}>
                    <h2 className={"text-center text-2xl text-bold text-clip antialiased"}>
                        Contact Code Blog
                    </h2>
                    <p className={"space-y-2 my-2"}>
                       Contact Code Blog via email @
                        <br/>
                        vakpo.okagbare@gmail.com
                    </p>
                </div>
                <div></div>
            </div>
            </>
    );
};

export default PostsPage;