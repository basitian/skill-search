import { error } from "console";
import { Modal, type ModalProps } from "flowbite-react";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

type AddSkillInputs = {
  name: string;
  rating: string;
};

const AddSkillModal: React.FC<ModalProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddSkillInputs>({
    defaultValues: {
      rating: "0",
    },
  });

  const { mutate } = api.skill.create.useMutation({
    onSuccess: () => {
      reset();
      toast.success("Skill added!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to add skill! Please try again later.");
      }
    },
  });

  const onSubmit: SubmitHandler<AddSkillInputs> = (data) => {
    mutate({
      name: data.name,
      rating: parseInt(data.rating),
    });
  };

  return (
    <Modal dismissible={true} show={props.show} size="md" popup={true}>
      <div className="p-4">
        <Modal.Header>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Add a new Skill
          </h5>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                What is your skill?
              </label>
              <input
                {...register("name", {
                  required: { value: true, message: "A name is required" },
                  maxLength: {
                    value: 80,
                    message: "Max length is 80 characters",
                  },
                })}
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="React, playing the drums, Thai cooking,..."
              />
              {errors.name && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="rating"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  How would you rate your skill?
                </label>
                <span className="rounded bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {watch("rating")}
                </span>
              </div>

              <input
                {...register("rating", { required: true, max: 5, min: 0 })}
                id="rating"
                type="range"
                defaultValue={3}
                min={1}
                max={5}
                step={1}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddSkillModal;
