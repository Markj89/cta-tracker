import React, { Fragment, ReactNode } from "react";
import Logo from "./../Logo";

interface SidebarProps {
  open: boolean;
  click: () => void;
  children: ReactNode;
}

const Sidebar = ({ open = false, click, children }) => {
  function clickHandler(e) {
    e.preventDefault();
    click();
    return false;
  }

  return (
    <aside className="sidebar_wrapper">
      <Logo />
      <div className="dropdown_container">
        <div className="dropdown">
          <ul>
            <li className="dropdown_trigger">
              <div
                className="train_wrapper"
                role="listbox"
                tabIndex={0}
                onMouseDown={(e) => clickHandler(e)}
              >
                <div
                  className="train routes"
                  style={{
                    width: "60px",
                    height: "57px",
                    textDecoration: "none",
                    color: "#fff",
                    backgroundColor: "#000",
                    display: "flex",
                    borderRadius: "3px 0px 0px 3px",
                  }}
                ></div>
                <div className="view_route">
                  <span>View Routes</span>
                </div>
              </div>
              {open && <ul className="trainlist">{children}</ul>}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
