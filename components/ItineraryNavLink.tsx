// ItineraryNavLink.js

import React from "react";

const ItineraryNavLink = ({ NavLinks, activeNav, setActiveNav }: any) => {
  const handleNavLinkClick = (title: string) => {
    setActiveNav(title);
  };

  return (
    <div>
      <ul className="flex items-center gap-5 text-gray-500 border-b-0 border-gray-300">
        {NavLinks.map((link: any) => (
          <li
            key={link.href}
            onClick={() => handleNavLinkClick(link.title)}
            className={`${
              activeNav === link.title
                ? "py-[5px] text-[#1c94ad] border-b-2 border-[#1c94ad] text-xl font-bold"
                : ""
            }`}
          >
            <a href={`#${link.href}`}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryNavLink;
