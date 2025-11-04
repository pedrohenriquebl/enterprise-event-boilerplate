const tailwindConfig = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
        },
        screens: {
          DEFAULT: "100%",
          md: "1276px",
        },
      },
    },
  },
};

export default tailwindConfig;
