function Box({ onclick, element, onbuttonclick }) {
  return (
    <div className="flex bg-green-500 p-3 break-all rounded-2xl border"
      onClick={onclick}>
      <p className="flex-1">{element.title}</p>
      <button className="h-10 w-auto self-end justify-self-end" onClick={onbuttonclick}>Delete</button>
    </div>
  );
}

export default Box;
