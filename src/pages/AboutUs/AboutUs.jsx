import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto text-textt">
      <h1 className="text-4xl font-bold mb-4 text-primaryy">About SkillSwap</h1>

      <p className="mb-6 text-lg">
        <strong>SkillSwap</strong> is a dynamic bartering platform where users
        can exchange skills without the use of money. Whether you're a designer,
        coder, musician, or language learner — SkillSwap lets you offer your
        skills in exchange for the ones you need. It's a community-driven space
        built on collaboration and mutual growth.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-secondaryy">
        🌟 Key Features
      </h2>
      <ul className="list-disc ml-6 mb-6 space-y-1">
        <li>User registration, login, and profile update</li>
        <li>Offer or request skills across various categories</li>
        <li>Send and respond to exchange requests</li>
        <li>Set skill availability (Available / Unavailable)</li>
        <li>Rate and review other users after exchanges</li>
        <li>Save favorite skill offers or requests</li>
        <li>Admin panel to manage users, reports, and categories</li>
        <li>Trending skills section to highlight in-demand skills</li>
        <li>User suggestions for platform improvement</li>
        <li>Skill sharing to platforms like Facebook and WhatsApp</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 text-secondaryy">
        🎯 Who Can Benefit
      </h2>
      <p className="mb-6">
        SkillSwap is for everyone — students, freelancers, professionals, or
        hobbyists — looking to grow through collaboration. By offering your
        skill, you can learn something new in return. No fees, just fair trade.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-secondaryy">
        📘 How to Use SkillSwap
      </h2>
      <ol className="list-decimal ml-6 mb-6 space-y-1">
        <li>Create an account or log in.</li>
        <li>Update your profile with bio and location.</li>
        <li>Post your offered skills or request new ones.</li>
        <li>Explore the skills listed by others using search or filters.</li>
        <li>Send an exchange request to trade your skill with another user.</li>
        <li>Accept or reject requests as needed.</li>
        <li>After successful exchange, give feedback via rating or review.</li>
        <li>Save interesting skills to revisit later.</li>
        <li>Share your offerings on social platforms to reach more users.</li>
        <li>Use the suggestion box to help improve the platform!</li>
      </ol>

      <div className="bg-base-200 p-4 rounded-xl shadow mt-8">
        <h3 className="text-xl font-bold text-primaryy mb-2">
          Join the Movement
        </h3>
        <p>
          Empower your learning journey by trading what you know for what you
          want to learn.
          <br />
          SkillSwap is your gateway to growth, one skill at a time. 🚀
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
