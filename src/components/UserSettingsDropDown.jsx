import * as auth from "../utils/auth.js";

const UserSettingsDropDown = ({ profileLink }) => {
	const username = auth.getLocalUserData().username;

	return (
		<div className="dropdown ps-2">
			<a
				className="dropdown-toggle nav-link text-center float-sm-end "
				href="#top"
				id="dropdownId"
				data-bs-toggle="dropdown"
			>
				<span id="usernameLabel">
					<i className="bi-person-fill"></i>
					<span> {username ? username : ""}</span>
				</span>
			</a>
			<div
				className="dropdown-menu dropdown-menu-sm-end shadow-sm"
				aria-labelledby="dropdownId"
			>
				{/* <!-- <btn className="dropdown-item btn" href="#top"> <i className="bi bi-gear-fill pe-1"></i> <span>Settings</span> </btn> --> */}
				<a className="dropdown-item btn" href={profileLink}>
					<i className="bi bi-person-fill pe-2"></i>
					<span>Profile</span>
				</a>
				{/* <!-- <btn className="dropdown-item btn" href="#"> <i className="bi bi-people-fill pe-2"></i><span>Friends</span></btn> --> */}
				{/* <!-- <btn className="dropdown-item btn" href="#"> <i className="bi bi-heart-fill pe-2"></i> <span>Likes</span> </btn> --> */}
				{/* <!-- <btn className="dropdown-item btn" href="#"> <i className="bi bi-bookmark-fill pe-2"></i><span>Saved</span></btn> --> */}
				<button className="dropdown-item btn" onClick={() => auth.logout()}>
					<i className="bi bi-x-circle-fill pe-1"></i>
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};
export default UserSettingsDropDown;
