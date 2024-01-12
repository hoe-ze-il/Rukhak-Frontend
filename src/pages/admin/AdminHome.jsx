import { LayoutDashboard, ClipboardList, Users } from "lucide-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";
import { SidebarItem } from "@/components/admin/SidebarItem";
import Dashboard from "./Dashboard";
import InventoryManagement from "./InventoryManagement";
import "@/styles/admin/admin.scss";
import "@/styles/admin/sidebar.scss";
import NewProduct from "./NewProduct";
import { NewProductProvider } from "@/contexts/admin/NewProductContext";
import ProductDetail from "./ProductDetail";
import EditProduct from "./EditProduct";
import { FilterContextProvider } from "@/contexts/admin/FilterContext";
import { SellerContextProvider } from "@/contexts/admin/SellerContext";
import SellerManagement from "./SellerManagement";

function AdminHome() {
  return (
    <div className="admin-home">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          // alert
          to="/admin/dashboard"
        />

        <SidebarItem
          icon={<ClipboardList size={20} />}
          text="Inventory Management"
          to="/admin/inventory"
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Seller Management"
          to="/admin/seller"
        />
      </Sidebar>
      <main className="admin-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/inventory"
            element={
              <FilterContextProvider>
                <InventoryManagement />
              </FilterContextProvider>
            }
          />
          <Route
            exact
            path="/inventory/new"
            element={
              <NewProductProvider>
                <NewProduct />
              </NewProductProvider>
            }
          />
          <Route
            path="/inventory/:id"
            element={
              <NewProductProvider>
                <ProductDetail />
              </NewProductProvider>
            }
          />
          <Route
            path="/seller"
            element={
              <SellerContextProvider>
                <SellerManagement />
              </SellerContextProvider>
            }
          />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          {/* redirect to dashboard by  */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminHome;
