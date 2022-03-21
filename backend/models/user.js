import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
);

// hash password when user is created and when user is updated
userSchema.pre("save", function (next) {
  let user = this; // this is the user object

  // only hash the password if it has been modified (or is new)
  // if (!user.isModified("password")) return next(); // if password is not modified, skip this step
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) return next(err);
  //   bcrypt.hash(user.password, salt, (err, hash) => {
  //     if (err) return next(err);
  //     user.password = hash;
  //     next();
  //   });
  // });

  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, (err, hash) => {
      if (err) {
        console.log("BCRYPT HAS ERROR!", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      console.log("Compare password error!", err);
      return next(err, false);
    }
    console.log("Passwords match", isMatch);
    return next(null, isMatch); // true
  });
};

const user = mongoose.model("User", userSchema);

export default user;
