export const pageLinks = {
  authPage: {
    baseUrl: "/auth",
    dynamicUrl: "/auth",
  },
  lecturePage: {
    baseUrl: "/lecture",
    dynamicUrl: "/lecture/:lectureId",
  },
  dashboardPage: {
    baseUrl: "/dashboard",
    dynamicUrl: "/dashboard",
  },
  notepadPage: {
    baseUrl: "/notepad",
    dynamicUrl: "/notepad/:notepadId",
  },
  unresolvedPage: {
    baseUrl: "*",
    dynamicUrl: "*",
  },
};
