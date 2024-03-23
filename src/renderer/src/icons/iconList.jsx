export default function getSVGIcon(icon){

  const icons = {
    textIncrease: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white"><path d="m40-200 210-560h100l210 560h-96l-51-143H187l-51 143H40Zm176-224h168l-82-232h-4l-82 232Zm504 104v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>,
    textDecrease: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white"><path d="m33.543-200 215.5-560h110.283l213.587 560H464.239l-49.804-139.413H190.587L140.304-200H33.544Zm187.001-224h163.934L304.87-650.022h-4L220.544-424Zm380.413-12.413v-87.174h325.5v87.174h-325.5Z" /></svg>
  }

  return icons[icon]

}