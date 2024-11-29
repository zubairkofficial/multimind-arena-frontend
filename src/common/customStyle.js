export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#101010", // Dark background for the control
      borderColor: state.isFocused || state.menuIsOpen ? "#4caf50" : "#333333", // Green border when clicked (focus) or dropdown is open
      boxShadow:
        state.isFocused || state.menuIsOpen ? "0 0 0 2px #4caf50" : "none", // Optional: add green outline on focus
      color: "white", // Text color for the control
      minHeight: "36px",
      "&:hover": {
        borderColor: "#4caf50", // Ensures the border is black on hover as well
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#101010", // Background color for the dropdown menu
      color: "white", // Text color for the dropdown menu featureNames
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#333333" : "#101010", // Dark background for featureNames
      color: state.isSelected ? "white" : "#bbb", // Text color for selected and non-selected featureNames
      borderColor: "#4caf50",
      "&:hover": {
        backgroundColor: "#222222", // Hover effect color
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4caf50", // Background color for selected values
      color: "white", // Text color for selected values
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white", // Text color for selected value label
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white", // Color for the remove button
      "&:hover": {
        backgroundColor: "#4caf50", // Hover color for remove button
      },
    }),
  };