import "./options.css";
import { resetBoard, solveBoard } from "../Sudoku.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Options = ({ board, setBoard }) => {
  
  const resetBtn = {
    "--c": "#E95A49",
  }

  function generateToast(type, msg){
      switch(type){
        case "error":
          toast.error(msg, {})
          break;
        case "info":
          toast.info(msg, {});
          break;
        case "success":
          toast.success(msg, {});
          break;
        case "promise":
          // yet to be seen how we implement this
          break;
        case "default":
          console.log("invalid toast type for generateToast function")
          break;
      }
  }
  
  function solve() {
    const solvedBoard = solveBoard(board);
    const newBoard = [...solvedBoard];
    setBoard(newBoard);
    // eventually we write to handle errors from solve function and choose toast
    generateToast("success", "The board was solved!")
  }

  function reset(){
    const zeroBoard = resetBoard(board)
    setBoard([...zeroBoard]);
    
    generateToast("info", "The board was reset!")
  }

  return (
    <>
      <div id="opt-heading" className="opt-thirds">
        <h1>Options</h1>
        <p id="opt-sub-heading">Update board settings below.</p>
      </div>
      <div id="opt-form" className="option-thirds">
        <p>This is a lot of sample text written to test theme colors.</p>
      </div>
      <div id="opt-solve" className="option-thirds">
        <button style={resetBtn} onClick={reset} id="reset-btn" className="buttons">
          Reset
        </button>
        <button onClick={solve} id="solve-btn" className="buttons">
          Solve
        </button>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
    </>
  );
};

export default Options;
