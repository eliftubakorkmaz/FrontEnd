"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(options) {
    return function (constructor) {
        constructor.prototype.template = options.template;
        constructor.prototype.selector = options.selector || "";
    };
}
class Router {
    static navigate(component) {
        const root = document.querySelector("app-root");
        if (root) {
            const instance = new component();
            root.innerHTML = instance.template;
            if (typeof instance.ngOnInit === 'function') {
                instance.ngOnInit();
            }
        }
    }
}
window.addEventListener("load", () => {
    Router.navigate(HomeComponent);
});
let HomeComponent = class HomeComponent {
    ngOnInit() {
        var _a;
        const childElement = document.querySelector("app-child");
        if (childElement) {
            childElement.innerHTML = (_a = new ChildComponent()) === null || _a === void 0 ? void 0 : _a.template;
        }
    }
};
HomeComponent = __decorate([
    Component({
        template: `
    <h1>Home Component</h1>
    <app-child></app-child>
    `
    })
], HomeComponent);
let ChildComponent = class ChildComponent {
};
ChildComponent = __decorate([
    Component({
        template: "<p>I'm a child component</p>",
        selector: "app-child"
    })
], ChildComponent);
