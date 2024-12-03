import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";

import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // # REACT HOOK FORM. #
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin, // there are a problem on supabase (backend) :(
    // mutationFn: (data) => console.log(data),
    onSuccess() {
      toast.success("New Cabin successfully crested");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // reset the form fields
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const submitHandler = (data) => {
    mutate({ ...data, image: data.image[0] });
    // console.log(data);
  };

  const onInvalidHandler = (errors) => {
    console.log(errors);
  };

  // 1) give each input the register function.
  return (
    // 2) give the form handleSubmit fun
    <Form onSubmit={handleSubmit(submitHandler, onInvalidHandler)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })} // register('field-name', options => validation { required: 'errorMessage' })
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
        {/* ...register() here give the input onBlur function, onChange function to the input */}
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 20, message: "Price should be at least 20$" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (discountValue) => {
              if (+discountValue >= +getValues().regularPrice)
                return "Discount should be less than regular price"; // error message
              // else return true; // else returns that the field is valid (true).
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
