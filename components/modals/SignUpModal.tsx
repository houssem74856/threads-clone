"use client";

import { AiFillGithub } from "react-icons/ai";
import Modal from "@/components/ui/MyModal";
import { Input } from "@/components/ui/MyInput";
import { useState } from "react";
import Button from "@/components/ui/MyButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModalStore";

const SignUpModal = () => {
  const { type, isOpen, onOpen, onClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isModalOpen = isOpen && type === "signUp";

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({
    email,
    password,
    username,
  }) => {
    setIsLoading(true);

    const { error: supabaseError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          user_name: username,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (supabaseError) {
      return toast.error(supabaseError.message);
    }

    router.refresh();

    toast.success("Check email for verification");

    resetField("username");
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
    onOpen("signIn");
  };

  return (
    <Modal
      title="Welcome to Threads"
      description="Create an Account!"
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <div className="flex flex-col gap-4">
        <Input
          id="username"
          label="Username"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
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
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="my-2 rounded-md"
        >
          Sign up
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
          Already have an account?
          <span
            onClick={toggle}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default SignUpModal;
