import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 10,
  newestOnTOp: true,
  position: "top-right"
});