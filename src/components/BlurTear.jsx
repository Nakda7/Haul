
const BlurTear = () => {
  return (
    <div>
        <div className="absolute top-40 left-[12rem] w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animate-spin"></div>
        <div className="absolute top-40 left-[22rem] w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000 animate-spin"></div>
        <div className="absolute top-24 left-[17rem] w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000 animate-spin"></div>
    </div>
  )

}
export default BlurTear
