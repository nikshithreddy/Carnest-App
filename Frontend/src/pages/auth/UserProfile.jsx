import React, { useEffect, useState } from "react";
import {
	Box,
	TextField,
	Avatar,
	Typography,
	Button,
	Snackbar,
	Alert,
	CircularProgress,
	Select,
	MenuItem,
	Grid,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation, useUserProfileQuery, useGetGovernmentIdTypesQuery } from "../../services/userAuthApi";
import { setProfile } from "../../features/authSlice";
import LocationSearchInput from "../../components/LocationSearchInput";

const UserProfile = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { profile, access_token } = useSelector((state) => state.auth);
	const { data: profileData, isLoading: isProfileLoading } = useUserProfileQuery(access_token, {
		skip: !access_token
	});
	const { data: idTypesData, isLoading: isIdTypesLoading } = useGetGovernmentIdTypesQuery(access_token, {
		skip: !access_token
	});

	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("success");
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		addressLat: "",
		addressLng: "",
		idType: "",
		idNumber: "",
	});

	const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (profileData) {
			dispatch(setProfile({ profile: profileData }));
		}
	}, [profileData, dispatch]);

	useEffect(() => {
		if (profile) {
			setUser({
				firstName: profile?.first_name || "",
				lastName: profile?.last_name || "",
				email: profile?.email || "",
				phone: profile?.phone_number || "",
				address: profile?.address || "",
				addressLat: profile?.address_lat || "",
				addressLng: profile?.address_lng || "",
				idType: profile?.government_id_type || "",
				idNumber: profile?.government_id_number || "",
			});
		}
	}, [profile]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleLatLng = (e, name) => {
		if (name === "address") {
			setUser((prev) => ({ ...prev, addressLat: e.lat, addressLng: e.lng }));
		}
	};

	const handleAddress = (e, name) => {
		if (name === "address") {
			setUser((prev) => ({ ...prev, address: e }));
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleSaveChanges = async () => {
		try {
			const formData = new FormData();
			formData.append("first_name", user.firstName);
			formData.append("last_name", user.lastName);
			formData.append("email", user.email);
			formData.append("phone_number", user.phone);
			formData.append("address", user.address);
			formData.append("address_lat", user.addressLat);
			formData.append("address_lng", user.addressLng);
			formData.append("government_id_type", user.idType);
			formData.append("government_id_number", user.idNumber);

			const response = await updateUserProfile({
				user: profile?.id,
				actualData: formData,
				access_token: access_token,
			}).unwrap();

			setMessage("Profile updated successfully!");
			setSeverity("success");
			setOpen(true);
			dispatch(setProfile({ profile: response }));
		} catch (error) {
			console.error("Error updating profile:", error);
			if (error.data) {
				if (typeof error.data === "object") {
					const fieldErrors = Object.entries(error.data)
						.map(([field, messages]) => `${field}: ${messages.join(", ")}`)
						.join("\n");
					setMessage(fieldErrors);
				} else {
					setMessage(error.data);
				}
			} else {
				setMessage("Failed to update profile. Please try again.");
			}
			setSeverity("error");
			setOpen(true);
		}
	};

	if (isProfileLoading || isIdTypesLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box>
			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					backgroundColor: isMobile ? "#fff" : "#f0f2f5",
					padding: isMobile ? 0 : theme.spacing(2),
				}}
			>
				<Box
					sx={{
						width: "100%",
						maxWidth: 640,
						padding: theme.spacing(4),
						borderRadius: "8px",
						backgroundColor: "#FFFFFF",
						boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
						textAlign: "center",
					}}
				>
					<Typography variant="h4" sx={{ fontWeight: "bold", color: "#FF6436" }} align="center" gutterBottom>
						User Profile
					</Typography>
					<Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
						<Avatar sx={{ width: 100, height: 100 }} alt={`${user.firstName} ${user.lastName}`}>
							{user?.firstName?.[0]}
						</Avatar>
					</Box>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<TextField
							label="First Name"
							name="firstName"
							value={user.firstName}
							onChange={handleInputChange}
							fullWidth
							margin="normal"
							sx={{
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.23)',
									},
									'&:hover fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.87)',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#FF6436',
										borderWidth: '2px',
									},
								},
								'& .MuiInputLabel-root': {
									'&.Mui-focused': {
										color: '#FF6436',
									},
								},
							}}
						/>
						<TextField
							label="Last Name"
							name="lastName"
							value={user.lastName}
							onChange={handleInputChange}
							fullWidth
							margin="normal"
							sx={{
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.23)',
									},
									'&:hover fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.87)',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#FF6436',
										borderWidth: '2px',
									},
								},
								'& .MuiInputLabel-root': {
									'&.Mui-focused': {
										color: '#FF6436',
									},
								},
							}}
						/>
					</Box>
					<TextField
						label="Email Address"
						name="email"
						disabled
						value={user.email}
						type="email"
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Phone Number"
						name="phone"
						disabled
						value={user.phone}
						fullWidth
						margin="normal"
					/>
					<LocationSearchInput
						id="address"
						name="address"
						label="Address"
						value={user.address}
						handleLatLng={handleLatLng}
						handleAddress={handleAddress}
					/>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Select
							fullWidth
							required
							id="idType"
							name="idType"
							value={user.idType || ''}
							onChange={handleInputChange}
							displayEmpty
							sx={{ 
								mt: 2, 
								textAlign: "left",
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.23)',
									},
									'&:hover fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.87)',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#FF6436',
										borderWidth: '2px',
									},
								},
								'& .MuiInputLabel-root': {
									'&.Mui-focused': {
										color: '#FF6436',
									},
								},
							}}
							variant="outlined"
						>
							<MenuItem value="" disabled>
								{profile?.government_id_type ? profile.government_id_type : "Government ID Type"}
							</MenuItem>
							{idTypesData?.map(({ value, label }) => (
								<MenuItem key={value} value={value}>
									{label}
								</MenuItem>
							))}
						</Select>
						<TextField
							label="Government ID Number"
							name="idNumber"
							value={user.idNumber}
							onChange={handleInputChange}
							fullWidth
							margin="normal"
							sx={{
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.23)',
									},
									'&:hover fieldset': {
										borderColor: 'rgba(0, 0, 0, 0.87)',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#FF6436',
										borderWidth: '2px',
									},
								},
								'& .MuiInputLabel-root': {
									'&.Mui-focused': {
										color: '#FF6436',
									},
								},
							}}
						/>
					</Box>
					<Box>
						{isLoading ? (
							<CircularProgress />
						) : (
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#FF6436",
									color: "white",
									marginTop: theme.spacing(2),
									marginBottom: isMobile ? "40px" : theme.spacing(1),
									"&:hover": {
										backgroundColor: "#36a420",
									},
									textTransform: "none",
								}}
								fullWidth
								onClick={handleSaveChanges}
							>
								Save Changes
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default UserProfile;
