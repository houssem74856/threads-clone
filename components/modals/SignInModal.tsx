"use client";

import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/MyModal";
import { Input } from "@/components/ui/MyInput";
import { useState } from "react";
import Button from "@/components/ui/MyButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import useModal from "@/hooks/useModalStore";

const SignInModal = () => {
  const router = useRouter();
  const { type, isOpen, onOpen, onClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === "signIn";

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return toast.error(error.message);
    }

    router.refresh();

    toast.success("Logged in");

    resetField("email");
    resetField("password");
    onClose();

    setIsLoading(false);
  };

  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      toast.error(error.message);
    }

    router.refresh();
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const toggle = () => {
    onOpen("signUp");
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <div className="flex flex-col gap-4">
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="my-2 rounded-md"
          onClick={handleSubmit(onSubmit)}
        >
          Log in
        </Button>
        <Button
          className="bg-neutral-700 text-neutral-300 rounded-md font-medium  relative"
          onClick={signInWithGithub}
        >
          <AiFillGithub
            size={24}
            className="
              absolute
              left-4
              top-2
            "
          />
          Continue with Github
        </Button>
        <p
          className="
          text-sm 
          leading-normal 
          text-center
        "
        >
          First time using Threads?
          <span
            onClick={toggle}
            className="
            text-neutral-400 
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default SignInModal;
