import "./PreviewMessages.css";

const PreviewMessages = ({ message }) => {
  let content;
  if (message?.content.length > 150)
    content = `${message?.content.slice(0, 150)}...`;
  else content = message?.content;
  return (
    <div className="preview_msg_div">
      <h3 className="subject_line">{message?.subject_line}</h3>
      <p>{content}</p>
    </div>
  );
};

export default PreviewMessages;
