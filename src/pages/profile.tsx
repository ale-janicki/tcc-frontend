"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Menu from "@/components/menu";
import { Private } from "@/components/private";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { cepCheck, getUserInfo } from "@/services/api";

export default function Register() {
  const { handleSubmit, register, setValue } = useForm();
  const [user, setUser]: any = useState();
  const emptyAddress = { city: "", state: "", street: "", district: "" };
  const [address, setAddress] = useState(emptyAddress);
  const lastCep = useRef("");
  const { onChange: onCepChange, ...cepField } = register("cep");

  useEffect(() => {
    getUserInfo().then((ress: any) => {
      setUser(ress.data);
    });
  }, []);

  const handleCep = (value: string) => {
    const digits = value.replace(/\D/g, "");
    lastCep.current = digits;
    if (digits.length !== 8) {
      setAddress(emptyAddress);
      return;
    }
    cepCheck(digits).then((ress) => {
      if (lastCep.current !== digits) return;
      if (!ress || ress.erro) {
        setAddress(emptyAddress);
        return;
      }
      setAddress({
        city: ress.localidade ?? "",
        state: ress.uf ?? "",
        street: ress.logradouro ?? "",
        district: ress.bairro ?? "",
      });
    });
  };

  const updateUser = (data: any) => {
    console.log(user);
    console.log(address);
    console.log(data);
  };

  return (
    <Private>
      <main className="bg-lightGrey-500">
        <Menu />
        <div className="flex h-screen xl:pl-[33.333333%]">
          <div className="flex flex-col m-auto w-4/5 h-4/5 bg-white rounded-2xl ">
            <div className="grid grid-cols-2 px-2 gap-1 w-full justify-around mt-8 md:mt-16 "></div>
            <form
              className="flex flex-col mt-9 text-center mx-auto md:mt-16"
              onSubmit={handleSubmit(updateUser)}
            >
              <h1 className=" text-4xl font-audiowide text-primary-500 ">
                Usuário
              </h1>
              <p className="mt-4 font-audiowide text-primary-500">
                Seus pontos: {user ? user.credits : 0}
              </p>
              <div className="grid grid-rows-3 gap-6 h-26 mt-14 ml-2 mr-2">
                <Input
                  {...register("name_user")}
                  type="text"
                  placeholder="Nome completo"
                  onChange={(e: any) => {
                    setValue("name_user", e.target.value);
                  }}
                  defaultValue={user ? `${user.name_user}` : ""}
                />
                <Input
                  {...register("email")}
                  type="text"
                  placeholder="Email"
                  defaultValue={user ? `${user.email}` : ""}
                />
                <div className="grid grid-cols-3 gap-6">
                  <Input
                    {...cepField}
                    type="text"
                    placeholder="CEP "
                    onChange={(e: any) => {
                      onCepChange(e);
                      handleCep(e.target.value);
                    }}
                  />
                  <Input type="text" placeholder="Cidade" value={address.city} disabled />
                  <Input type="text" placeholder="Estado" value={address.state} disabled />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Input type="text" placeholder="Endereço" value={address.street} disabled />
                  <Input type="text" placeholder="Bairro" value={address.district} disabled />
                </div>
                <Input type="text" placeholder="Senha Antiga" />
                <Input type="text" placeholder="Nova Senha" />
              </div>
              <div className="mt-4 center h-10 md:mt-24 md:h-20">
                <Button
                  className="bg-primary-500 text-white font-audiowide h-full rounded-full p-2"
                  type="submit"
                >
                  Atualizar
                </Button>
                <Button type="submit" color="secondary">
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Private>
  );
}
