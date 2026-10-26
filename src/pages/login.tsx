import Head from "next/head";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/auth";
import Button from "@/components/button";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import Popup from "@/components/popup";

export default function Login() {
  const { handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("title")
  const [content, setContent] = useState("content")

  async function handleSignIn() {
    const data = { email, password };
    await signIn(data);
  }

  return (
    <main className="bg-[url('../../public/img/bg-login-mobile.png')] bg-cover bg-center w-screen h-screen lg:bg-[url('../../public/img/bg-login.png')]">
      <Head>
        <title>Login</title>
      </Head>
      <Popup
        isOpen={isOpen}
        setOpen={setIsOpen}
        title={title}
        content={content}
      />
      <div className="flex h-screen">
        <div className="flex flex-col m-auto w-4/5 h-4/5 bg-darkGrey-500/30 rounded-2xl md:text-4xl lg:w-2/5">
          <div className="grid grid-cols-2 px-2 gap-1 w-full justify-around mt-8 md:mt-16 md:gap-10">
            <Link href={"/login"}>
              <Button color="third">LOG-IN</Button>
            </Link>
            <Link href={"/register"}>
              <Button color="disabledTwo">CADASTRO</Button>
            </Link>
          </div>
          <form
            className="flex flex-col mt-9 text-center mx-auto md:mt-16"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <h1 className=" text-4xl font-audiowide text-primary-500 md:text-6xl">
              Log in
            </h1>
            <div className="grid grid-rows-2 gap-8 h-36 mt-14 md:gap-10 md:h-60">
              <Input
                id="email"
                name="email"
                type="email"
                color="primary"
                placeholder="Email"
                required
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                id="password"
                name="password"
                type="password"
                color="primary"
                placeholder="Senha"
                required
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p className="mt-4 text-xs text-black/50 md:text-xl">
              Demonstração: demo@totem.dev / demo123
            </p>
            <div className="mt-12 h-10 md:mt-24 md:h-20">
              <Button type="submit" color="primary">
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
