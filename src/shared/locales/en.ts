export default {
  pages: {
    about: {
      title: "About the Task",
    },
    map: {
      title: "Map",
    },
  },
  markersList: {
    empty: {
      title: "Empty marker list",
      text: "Add marker to map",
    },
  },
  notifications: {
    marker: {
      removeSuccess: "Successfully removed",
      removeFailed: "Error while removing",
      addFailed: "Error while adding",
      addSuccess: "Successfully added",
    },
  },
  task: `
  # SquareGPS Test Task

You need to create an application using **Vuejs, Vuex, VueRouter, Vuetify**. The application header should contain a menu with 2 items: **About the Task** and **Map**. The main part of the application should display the content of these sections.

## Section "About the Task"

This section should contain the text of the task, styled accordingly.

## Section "Map"

The screen should have a map and a list (see example):

1. When you click the add button, the map should enter the marker adding mode: a marker should appear at the click location, and an entry with the address of the point should appear in the list.
    a. To search for the address, you can use any free geocoding API, for example: https://geocode.maps.co/.
    b. If the address is not found, an error should be displayed, and the marker should not be added to the list.
2. When clicking on a marker, the corresponding list entry should be highlighted.
3. When clicking on an entry in the list, the map should center on the marker.
4. Markers should be stored locally and should not disappear after reloading the page.
5. The address bar should display the id of the selected marker.
Local data storage should be organized as a service emulating a backend. (A Backend class is required, which pseudo-asynchronously stores data in localStorage).

**Additional**:

1. Consider displaying on mobile devices.
2. Implement localization.
3. Write 1 unit test for any component using **jest**.

**Reminder**: The test task is designed to demonstrate the ability to write good modular code, as well as to use the specified technologies and more. This code should be something to be proud of.

Example:
  `,
};
