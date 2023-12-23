import React from 'react';
import Image from "next/image";

const AboutPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div></div>
              <div className={"col-span-3"}>
                  <h2 className={"text-center text-2xl text-bold text-clip antialiased"}>
                      About Code Blog
                  </h2>
                  <p className={"space-y-2 my-2"}>
                      We provide latest information trending in the Information Technology sphere.

                      Always stay in touch to get all the juicy IT gist.
                  </p>
                  <p className={"space-y-2 my-2"}>
                      <Image src={"/images/3.jpg"}  alt={"code blog"} width={"1000"} height={"600"}/>
                  </p>
                  <p className={"space-y-2 my-2"}>
                      Code Blog is a blogging platform where all things Information
                      Technology is discussed. This is a product of Create Software
                      International. It was introduced after years of tutoring,
                      instructing and teaching about programming languages, the computer
                      and everything Information Technology.
                  </p>
                  <p className={"space-y-2 my-2"}>
                      Code-Blog tends to teach about different codes in specific languages
                      especially programming languages that have proven to be indispensable.
                      The beauty of Code Blog is the fact that every registered person
                      can make a post and earn cash after the post has gotten alot of votes
                      or likes or views.
                  </p>
                  <p className={"space-y-2 my-2"}>
                      So Code Blog is also a platform to introduce Programmers,
                      Software Developers, Enthutiasts and every one interested in
                      Information Technology. For more informaton and partnership,
                      pls CONTACT US.

                  </p>
              </div>
              <div></div>
            </div>
        </>
    );
};

export default AboutPage;