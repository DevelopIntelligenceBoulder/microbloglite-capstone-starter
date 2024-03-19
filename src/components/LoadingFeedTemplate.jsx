function LoadingFeedTemplate({ amount }) {
	return Array(amount)
		.fill(0)
		.map((elem, index) => <Post key={index} />);
}

const Post = () => (
	<article className="container card shadow placeholder bg-body-tertiary placeholder-glow">
		<div className="row">
			<div className="col-12 px-0">
				<div className="card-header">
					<div className="d-flex flex-wrap">
						<div
							className="bi bi-person-fill"
							style={{ fontSize: "x-large" }}
						></div>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="row">
					<div className="col-12">
						<div className="card-body">
							<div className="placeholder col-12"></div>
						</div>
					</div>
					<div className="col-12 p-0">
						<div className="card-footer py-1 gap-3">
							<div className="col-12">
								<a className="btn btn-sm bi-heart"></a>
								<a className="btn btn-sm bi-repeat"></a>
								<a className="btn btn-sm bi-share"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</article>
);

export default LoadingFeedTemplate;
