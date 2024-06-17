import { Input } from "@/components/ui/input"
import full_ver from "../../assets/full-ver.svg"

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
        <img src={full_ver} alt="moni buni logo" />
        <Input type="email" placeholder="Email" className="rounded-full input"/>
        <Input type="password" placeholder="password" className="rounded-full"/>
    </div>
  )
}

export default Login