"use client";
import Head from "next/head";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import CheckBox from "@/components/checkBox";
import { useState } from "react";
import { authLogin, createUser } from "@/services/api";
import Popup from "@/components/popup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const passwordRegex =
  /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*\d)(?=.*[A-Z]).{6,}$/;

export default function Register() {
  const [checkTerm, setCheckTerm] = useState(false);
  const [checkShare, setCheckSare] = useState(false);
  const [checkboxError, setcheckboxError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("title");
  const [popupContent, setPopupContet] = useState("content");
  const [token, setToken] = useState<any>(null);
  const nav = useRouter();

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data: any) => {
    const isValidPassword = passwordRegex.test(data.password_user);
    if (isValidPassword) {
      if (checkTerm) {
        createUser(
          data.name_user,
          data.email,
          data.password_user,
          checkTerm.toString(),
          checkShare.toString()
        )
          .then((ress) => {
            console.log(ress.status);
            authLogin(data.email, data.password_user).then((ress) => {
              setToken(ress.data.access_token);
              nav.push("/deposit");
            });
          })
          .catch((err: any) => {
            console.log(err);
            if (err.code == "ERR_NETWORK") {
              setPopupTitle("Erro!");
              setPopupContet("Erro de comunicação com o servidor");
              setIsOpen(true);
            }
            if (err.response?.status == 409) {
              setPopupTitle("Erro!");
              setPopupContet("O email já está sendo utilizado");
              setIsOpen(true);
            }
          });
      } else {
        setcheckboxError(true);
      }
    } else {
      setPopupTitle("Senha Invalida!");
      setPopupContet(
        "A senha não segue aos requisitos mínimos de:\n -1 caracter especial\n -1 letra maíuscula\n -1 numero\n -Conter no mínimo 6 caracteres"
      );
      setIsOpen(true);
    }
  };

  return (
    <main className="bg-[url('../../public/img/bg-login-mobile.png')] bg-cover bg-center w-screen h-screen flex justify-center lg:bg-[url('../../public/img/bg-login.png')]">
      <Head>
        <title>Cadastro</title>
      </Head>
      <Popup
        isOpen={isOpen}
        title={popupTitle}
        content={popupContent}
        setOpen={setIsOpen}
      />
      <div className="flex h-screen w-screen">
        <div className="flex flex-col m-auto w-4/5 h-4/5 bg-darkGrey-500/30 rounded-2xl md:text-4xl lg:w-2/5">
          <div className="grid grid-cols-2 px-2 gap-1 w-full justify-around mt-8 md:mt-16 md:gap-10">
            <Link href={"/login"}>
              <Button color="disabledTwo">LOG-IN</Button>
            </Link>
            <Link href={"/register"}>
              <Button color="third">CADASTRO</Button>
            </Link>
          </div>
          <form
            className="flex flex-col mt-9 text-center mx-auto md:mt-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className=" text-4xl font-audiowide text-primary-500 md:text-6xl">
              Cadastro
            </h1>
            <div className="grid grid-rows-2 gap-8 h-36 mt-14 md:gap-10 md:h-60">
              <Input
                {...register("name_user")}
                color="primary"
                type="text"
                placeholder="Nome completo"
                onChange={(e: any) => setValue("name_user", e.target.value)}
                required
              />
              <Input
                {...register("email")}
                color="primary"
                type="email"
                placeholder="Email"
                onChange={(e: any) => setValue("email", e.target.value)}
                required
              />
              <Input
                {...register("password_user")}
                color="primary"
                type="password"
                placeholder="Senha"
                onChange={(e: any) => setValue("password_user", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-4 mt-6 text-black/50 text-sm">
              <div
                className="flex gap-2 "
                onClick={() => {
                  setCheckSare(!checkShare);
                }}
              >
                <CheckBox
                  color={checkShare ? "checked" : "primary"}
                  checked={checkShare}
                />
                <p className={checkShare ? "text-primary-500" : " "}>
                  Aceito compartilhar meus dados
                </p>
              </div>
              <div
                className="flex gap-2"
                onClick={() => {
                  setCheckTerm(!checkTerm);
                  if (checkboxError) {
                    setcheckboxError(false);
                  }
                }}
              >
                <CheckBox
                  color={
                    checkboxError ? "error" : checkTerm ? "checked" : "primary"
                  }
                  checked={checkTerm}
                />
                <p
                  className={
                    checkboxError
                      ? "text-red-500/60"
                      : checkTerm
                      ? "text-primary-500"
                      : " "
                  }
                >
                  Aceito os termos e condições
                </p>
              </div>
            </div>
            <div className="mt-6 h-10 md:mt-24 md:h-20">
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
function setToken(token: any) {
  throw new Error("Function not implemented.");
}
