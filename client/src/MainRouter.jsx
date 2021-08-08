import React from "react";
import { Switch, Route } from "react-router-dom";
import { Cart, Home, Shop } from "./core";
import { Signup, Login, PrivateRoute, AdminRoute } from "./auth/components";
import { UserDashboard } from "./user/components";
import {
  AdminDashboard,
  CreateCategory,
  CreateProduct,
  Order,
  OrdersDashboard,
} from "./admin/components";
import { Product } from "./core/components";
import UpdateDetails from "./user/components/UpdateDetails";
import ManageProducts from "./admin/components/ManageProducts";
import UpdateProduct from "./admin/components/UpdateProduct";

function MainRouter() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/profile/update" component={UpdateDetails} />
        <AdminRoute
          exact
          path="/update/product/:id"
          component={UpdateProduct}
        />
        <AdminRoute exact path="/manage/products" component={ManageProducts} />
        <AdminRoute exact path="/order-details/:id" component={Order} />
        <AdminRoute exact path="/orders" component={OrdersDashboard} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/shop" component={Shop} />
        <AdminRoute exact path="/create/category" component={CreateCategory} />
        <AdminRoute exact path="/create/product" component={CreateProduct} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <PrivateRoute exact path="/dashboard" component={UserDashboard} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default MainRouter;
