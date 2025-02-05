import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, afterEach, describe, expect, it } from "vitest";

import MarkersList from "./MarkersList.vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  components,
  directives,
});

const markers = [
  { id: "1", address: "123 Main St", lon: 12.3456, lat: 78.9012 },
  { id: "2", address: "456 Elm St", lon: 98.7654, lat: 32.1098 },
];

const ACTIVE_CLASS_NAME = "v-list-item--active";

const elementHasClass = (element: VueWrapper<any, any>, className: string) => {
  return element.classes().includes(className);
};

describe("MarkersList", () => {
  let wrapper: VueWrapper<InstanceType<typeof MarkersList>>;

  beforeEach(() => {
    wrapper = mount(MarkersList, {
      global: {
        plugins: [vuetify],
      },
      props: {
        markers,
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("renders correct amount of markers", () => {
    const items = wrapper.findAllComponents({ name: "VListItem" });

    expect(items).toHaveLength(markers.length);
  });

  it('emits "show" event when a marker is clicked', async () => {
    const firstItem = wrapper.findComponent({ name: "VListItem" });
    await firstItem.trigger("click");

    expect(wrapper.emitted().show).toBeTruthy();
    expect(wrapper.emitted().show[0]).toEqual([markers[0]]);
  });

  it('emits "remove" event when remove icon is clicked', async () => {
    const firstRemoveButton = wrapper.findComponent({ name: "VIcon" });
    await firstRemoveButton.trigger("click");

    expect(wrapper.emitted().remove).toBeTruthy();
    expect(wrapper.emitted().remove[0]).toEqual([markers[0]]);
  });

  it("current marker becomes active", async () => {
    const ACTIVE_CLASS_NAME = "v-list-item--active";
    const firstItem = wrapper.findComponent({ name: "VListItem" });
    expect(elementHasClass(firstItem, ACTIVE_CLASS_NAME)).toBeFalsy();
    await wrapper.setProps({ currentMarker: markers[0].id });

    expect(elementHasClass(firstItem, ACTIVE_CLASS_NAME)).toBeTruthy();
  });

  it("changes active marker on click", async () => {
    const items = wrapper.findAllComponents({ name: "VListItem" });
    items.forEach((item) => {
      expect(elementHasClass(item, ACTIVE_CLASS_NAME)).toBeFalsy();
    });

    await items[1].trigger("click");
    await wrapper.setProps({ currentMarker: markers[1].id });

    expect(elementHasClass(items[0], ACTIVE_CLASS_NAME)).toBeFalsy();
    expect(elementHasClass(items[1], ACTIVE_CLASS_NAME)).toBeTruthy();
  });

  it("does not mark marker as active when clicking remove icon", async () => {
    const firstItem = wrapper.findComponent({ name: "VListItem" });
    const removeButton = firstItem.findComponent({ name: "VIcon" });

    await removeButton.trigger("click");

    expect(elementHasClass(firstItem, ACTIVE_CLASS_NAME)).toBeFalsy();
  });
});
