function Post() {
	return (
		<article class="container card shadow placeholder bg-body-tertiary placeholder-glow">
			<div class="row">
				<div class="col-12 px-0">
					<div class="card-header">
						<div class="d-flex flex-wrap">
							<div
								class="bi bi-person-fill"
								style={{ fontSize: "x-large" }}
							></div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="row">
						<div class="col-12">
							<div class="card-body">
								<div class="placeholder col-12"></div>
							</div>
						</div>
						<div class="col-12 p-0">
							<div class="card-footer py-1 gap-3">
								<div class="col-12">
									<a class="btn btn-sm bi-heart"></a>
									<a class="btn btn-sm bi-repeat"></a>
									<a class="btn btn-sm bi-share"></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default Post