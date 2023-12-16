import { StylesConfig } from 'react-select';
import colors from 'tailwindcss/colors';

export const tailwindColor = {
  ...colors,
  dark: {
    '900': '#1A1A1A',
    '800': '#242424',
    '700': '#2F2F2F',
  },
};

export const selectDarkStyle: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: tailwindColor.dark[900],
    borderRadius: '10px',
    border: `1px solid ${tailwindColor.zinc[800]}`,
    ':hover': {
      border: `1px solid ${tailwindColor.zinc[600]}`,
    },
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: tailwindColor.dark[800],
    ':hover': {
      backgroundColor: tailwindColor.dark[700],
    },
  }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: tailwindColor.gray[300],
    ':focus': {
      borderColor: tailwindColor.sky[500],
    },
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: tailwindColor.dark[800],
    borderRadius: '10px',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '15px',
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: tailwindColor.dark[700],
      cursor: 'pointer',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: tailwindColor.gray[100],
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: tailwindColor.red[600],
    ':hover': { color: tailwindColor.red[600] },
  }),
};
