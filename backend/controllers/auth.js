import User from "../models/user";
import jwt from "jsonwebtoken";

export const showMessage = (req, res) => {
  res.status(200).send(req.params.message);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // destructuring req.body
  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and must be at least 6 characters long");

  // check if user with email already exists
  let userExist = await User.findOne({ email }).exec();
  if (userExist)
    return res
      .status(400)
      .send(`User with the email "${email}" already exists`);

  // if user does not exist, create new user
  const newUser = new User({
    // create new user object
    name,
    email,
    password,
  });

  try {
    await newUser.save(); // save user to database
    return res.status(200).send("User registered successfully");
  } catch (error) {
    console.log("Create user error: ", error);
    return res.status(400).send("Error creating user, please try again");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user exists
    let user = await User.findOne({ email }).exec();
    // console.log("user exists", user);
    if (!user) return res.status(400).send("User with that email not found");

    // check if password is correct
    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(400).send("Error logging in.");
      if (!isMatch)
        return res.status(400).send("Wrong password, please try again!");
      // Generate a token then send it to the client
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(400).send("Error logging in, please try again");
  }
};
