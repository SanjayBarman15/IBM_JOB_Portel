import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, UploadCloud, User, Mail, Phone, FileText, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
      });
    }
  }, [user, open]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file instanceof File) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully");
        setOpen(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white sm:max-w-[480px] p-6 rounded-2xl border border-zinc-200 shadow-2xl">
        <DialogHeader className="space-y-1 pb-3 border-b border-zinc-100">
          <DialogTitle className="text-xl font-bold text-zinc-950 font-display">Update Profile Details</DialogTitle>
          <p className="text-xs text-zinc-500">Edit your public information and career resume.</p>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4 pt-2">
          <div className="space-y-3.5">
            <div>
              <Label htmlFor="fullname" className="text-xs font-semibold text-zinc-700">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="e.g. Alex Vance"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="email" className="text-xs font-semibold text-zinc-700">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="alex@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-xs font-semibold text-zinc-700">Phone</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="+1 234 567 890"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-xs font-semibold text-zinc-700">Professional Bio</Label>
              <Input
                id="bio"
                name="bio"
                type="text"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Senior Full Stack Engineer passionate about distributed systems"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="skills" className="text-xs font-semibold text-zinc-700">
                Skills & Tech Stack <span className="text-zinc-400 font-normal">(comma separated)</span>
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="React, TypeScript, Node.js, GraphQL, Docker"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="file" className="text-xs font-semibold text-zinc-700">
                Update Resume <span className="text-zinc-400 font-normal">(PDF format)</span>
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="mt-1 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-800 hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-zinc-100 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-zinc-950 text-white hover:bg-zinc-800"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
