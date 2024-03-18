// HTML element generation
// Posts are not deletable by default so the remove button is hidden

function Post({ postData, deletable = false }) {
	console.log(postData);
	return (
		<article className="card container shadow ">
			<div className="row">
				<Header postData={postData} />
				<div className="col">
					<div className="row">
						<Message postData={postData}/>
						<Footer deletable={deletable} />
					</div>
				</div>
			</div>
		</article>
	);
}

const Message = ({postData}) => (
	<div className="col-12">
		<div className="card-body">
			<div className="col-12 small">{postData.text}</div>
		</div>
	</div>
);

const Header = ({postData}) => (
	<div className="col-12 px-0">
		<div className="card-header">
			<div className="d-flex flex-wrap gap-3">
				<div
					className="bi bi-person-fill"
					style={{ fontSize: "x-large" }}
				></div>
				<div className="">{postData.name}</div>
				<div className="text-secondary-emphasis flex-grow-1">
					@{postData.username}
				</div>
				<div className="small">{postData.createdAt.split("T")[0]}</div>
			</div>
		</div>
	</div>
);

const Footer = ({postData, deletable }) => (
	<div className="col-12 p-0">
		<div className="card-footer py-1 gap-3">
			<div className="col-12">
				<a className="bi bi-heart btn btn-sm"></a>
				<a className="bi-repeat btn btn-sm"></a>
				<a className="btn btn-sm bi-share"></a>
				{deletable ? <DeleteButton postData={postData}/> : <></>}
			</div>
		</div>
	</div>
);

const DeleteButton = ({postData}) => (
	<a className="bi bi-x-octagon-fill text-danger-emphasis btn btn-sm float-end pe-2">
		<span className="ps-2">Remove</span>
	</a>
);

export default Post;
