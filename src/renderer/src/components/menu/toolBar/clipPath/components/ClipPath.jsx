import { MainContext } from "../../../../../contexts/mainContext"
import { useContext } from "react"
import { Button } from 'primereact/button';
import "./ClipPath.css"

export default function ClipPath() {

  const { addStyle } = useContext(MainContext)



  const shapes = {
    triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
    trapezoid: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    paralelogram: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    rombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    heptagon: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
    octagon: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    nonagon: "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
    decagon: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
    bevel: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
    rabbet: "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
    leftArrow: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
    rightArrow: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
    leftPoint: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
    rightPoint: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
    leftChevron: "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
    rightChrevron: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
    star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    cross: "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)",
    message: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
    close: "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
    frame: "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
    circle: "circle(50% at 50% 50%)",

  }

  const handleClick = (shape) => {

    addStyle({
      key: "clipPath",
      value: shapes[shape]
    })
  }

  const handleRestore = () => {
    addStyle({
      key: "clipPath",
      value: "none"
    })
  }

  return <>
    <div id="clipPath-title-container">
      <span>Formas</span>
      <Button icon="pi pi-refresh" rounded text aria-label="Filter" onClick={handleRestore} />
    </div>
    <div id="clipPath-main-container">
      {
        Object.keys(shapes).map(shape =>
          <div
            style={{
              width: "30px",
              height: "30px",
              clipPath: shapes[shape],
              backgroundColor: "var(--primary-color)",
              cursor: "pointer"
            }}
            onClick={() => handleClick(shape)}
            key={shape}
          >
          </div>)
      }

    </div>
  </>

}