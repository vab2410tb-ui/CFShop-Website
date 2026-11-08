"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedUser } from "@/next-auth";
import { updateUser } from "@/actions/auth/update-user";
import { UpdateUserSchema, UpdateUserInput } from "@/schemas/user.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const getDefaultValues = (user?: ExtendedUser): UpdateUserInput => ({
  name: user?.name ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  address: user?.address ?? "",
  ward: user?.ward ?? "",
  province: user?.province ?? "",
  isTwoFactorEnabled: user?.isTwoFactorEnabled ?? false,
});

export const ProfileInfo = ({ user, label }: UserInfoProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { update } = useSession();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserSchema),

    defaultValues: getDefaultValues(user),
  });

  useEffect(() => {
    form.reset(getDefaultValues(user));
  }, [user, form]);

  const handleEdit = () => {
    form.reset(getDefaultValues(user));
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset(getDefaultValues(user));
    setIsEditing(false);
  };

  const onSubmit = async (data: UpdateUserInput) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await updateUser(data);

      if (result.error) {
        console.error("UPDATE USER ERROR:", result.error);
        return;
      }

      const updatedSession = await update();

      console.log("UPDATED SESSION:", updatedSession);

      router.refresh();

      setIsEditing(false);
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto my-[50px]">
      <Card className="shadow-md ">
        <CardHeader>
          <p className="text-center text-2xl font-semibold">{label}</p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="rounded-lg border px-[12px] py-[8px] shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      {isEditing ? (
                        <div>
                          <p className="text-[12px] font-medium text-[#0000008f]">Name</p>

                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-0 py-0 text-[16px] h-5 shadow-none focus-visible:ring-0"
                              placeholder="Enter your full name"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Name</p>

                          <p className="max-w-[350px] truncate text-xs">
                            {user?.name || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                   <div className="rounded-lg border px-[12px] py-[8px] shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      {isEditing ? (
                        <div className="">
                          <p className="text-[12px] font-medium text-[#0000008f]">Email</p>

                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-0 py-0 text-[16px] h-5 shadow-none focus-visible:ring-0"
                              placeholder="Enter your Email"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Email</p>

                          <p className="max-w-[350px] truncate text-xs">
                            {user?.email || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="rounded-lg border px-[12px] py-[8px] shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      {isEditing ? (
                        <div className="">
                          <p className="text-[12px] font-medium text-[#0000008f]">Phone</p>

                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-0 py-0 text-[16px] h-5 shadow-none focus-visible:ring-0"
                              placeholder="Enter your phone"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Phone</p>

                          <p className="max-w-[350px] truncate text-xs">
                            {user?.phone || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <div className="rounded-lg border px-[12px] py-[8px] shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      {isEditing ? (
                        <div className="">
                          <p className="text-[12px] font-medium text-[#0000008f]">Address</p>

                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-0 py-0 text-[16px] h-5 shadow-none focus-visible:ring-0"
                              placeholder="Enter your Address"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Address</p>

                          <p className="max-w-[350px] truncate text-xs">
                            {user?.address || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ward */}
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <div className="rounded-lg border px-[12px] py-[8px] shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      {isEditing ? (
                        <div className="">
                          <p className="text-[12px] font-medium text-[#0000008f]">Ward</p>

                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-0 py-0 text-[16px] h-5 shadow-none focus-visible:ring-0"
                              placeholder="Enter your ward"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Ward</p>

                          <p className="max-w-[350px] truncate text-xs">
                            {user?.ward || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Province / City */}
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <div className="rounded-lg border px-[12px] py-[8px] shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      {isEditing ? (
                        <div className="">
                          <p className="text-[12px] font-medium text-[#0000008f]">Province/City</p>

                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-0 py-0 text-[16px] h-5 shadow-none focus-visible:ring-0"
                              placeholder="Enter your province/city"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Province/City</p>

                          <p className="max-w-[350px] truncate text-xs">
                            {user?.province || "-"}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2FA */}
              {user?.isCredentialsUser && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div>
                          <p className="text-sm font-medium">
                            Two-Factor Authentication
                          </p>

                          <span className="text-xs text-muted-foreground mt-2">
                            Enable two factor authentication for your account
                          </span>
                        </div>

                        {isEditing ? (
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="
                                  data-[state=checked]:bg-green-600
                                  data-[state=unchecked]:bg-gray-300
                              "
                            />
                          </FormControl>
                        ) : (
                          <Badge
                            variant={field.value ? "success" : "custom"}
                          >
                            {field.value ? "ON" : "OFF"}
                          </Badge>
                        )}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={handleEdit}>
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
