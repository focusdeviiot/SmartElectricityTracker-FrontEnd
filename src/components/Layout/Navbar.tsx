import React from "react";
import { NavLink } from "react-router-dom";
import { menuData, MenuItem } from "../../models/menuData";

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <li className="relative">
      {item.children ? (
        <span className="block px-4 py-2 cursor-default text-gray-700">
          {item.title}
        </span>
      ) : (
        <NavLink
          to={"/" + item.path}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "active" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
        >
          {item.title}
        </NavLink>
      )}
      {item.children && (
        <ul className="pl-4">
          {item.children.map((child: MenuItem) => {
            if (!child.isNotShow) {
              const newChild = { ...child, path: item.path + "/" + child.path };
              return <MenuItemComponent key={child.path} item={newChild} />;
            }
          })}
        </ul>
      )}
    </li>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <ul className="space-y-2">
        {menuData.map(
          (item: MenuItem) =>
            !item.isNotShow && <MenuItemComponent key={item.path} item={item} />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
