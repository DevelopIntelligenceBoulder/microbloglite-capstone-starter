import Post from "../components/Post.jsx";

function Feed(props) {
	return (
		<section class="container-fluid my-4 px-4">
			<div class="row gap-2 m-0">
				<article
					class="card col-sm-2 col-12 shadow"
					style={{ minHeight: 1000 + "px", minWidth: 10 + "rem" }}
				></article>
				<div class="col-sm col-12">
					<div id="cardHolder" class="row gap-2">
						{repeat(<Post />, 10)}
					</div>
				</div>
			</div>
		</section>
	);
}

const repeat = (func, n) => {
	let res = [];
	for (let i = 0; i < n; i++) {
		res.push(func);
	}
	return res;
};

export default Feed;
