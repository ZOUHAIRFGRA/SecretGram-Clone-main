import { AnimatePresence, motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { modalActions } from "../../../store/modalSlice";

function MessageInput({
  isRecording,
  handleInput,
  messageEmpty,
  getCaretIndex,
  sendMessage, // Function to send the message
  emitTypingEvent,
}) {
  // const dispatch = useDispatch();

  // // Ask for confirmation to terminate recording if user is currenly recording a message
  // const terminateRecording = (event) => {
  //   getCaretIndex(event);
  //   if (isRecording) {
  //     event.currentTarget.blur();
  //     dispatch(modalActions.openModal({ type: "stopRecordModal" }));
  //   }
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line
      sendMessage(); // Call the sendMessage function
    } else {
      emitTypingEvent(event); // Handle other keydown events (e.g., typing indicator)
    }
  };

  return (
    <div
    onClick={(event) => {
      event.currentTarget.querySelector("#messageInput").click();
    }}
    className="ml-[1rem] flex-grow min-h-[4rem] flex items-center group relative overflow-x-hidden"
  >
    {/* Placeholder */}
    <AnimatePresence>
      {messageEmpty && (
        <motion.span
          initial={{ left: 40, opacity: 0 }}
          animate={{ left: 0, opacity: 1, transition: { duration: 0.3 } }}
          exit={{ left: 40, opacity: 0, transition: { duration: 0.3 } }}
          className="text-secondary-text absolute top-1/2 -translate-y-1/2 left-0"
        >
          Message
        </motion.span>
      )}
    </AnimatePresence>

    {/* Input */}
    <div
      id="messageInput"
      className="outline-none flex-grow z-10 max-h-[16rem] overflow-y-scroll custom-scrollbar overflow-x-hidden whitespace-pre-wrap"
      contentEditable={true}
      onInput={handleInput}
      onFocus={getCaretIndex}
      onKeyDown={handleKeyDown} // Use handleKeyDown here
    ></div>
  </div>
  );
}

export default MessageInput;
