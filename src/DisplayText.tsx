type DisplayTextProps = {
  text: string;
}

export function DisplayText({ text }: DisplayTextProps) {
  return (
    <div className='display-text'>
      {text}
    </div>
  )
}
