function LoadingFeedTemplate({amount}) {
	return Array(amount)
		.fill(0)
		.map((elem, index) => <Post key={index} />)
}

const Post = () => (<article
			className="container card shadow placeholder bg-body-tertiary placeholder-glow"
		>
			<div className="row">
				<div className="col-12">
					<div className="px-3 pt-3">
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
							<div className="py-3 px-3">
								<div className="placeholder col-12"></div>
							</div>
						</div>
						<div className="col-12">
							<div className=" px-2 pb-3 gap-3">
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
		</article>);

export default LoadingFeedTemplate;
