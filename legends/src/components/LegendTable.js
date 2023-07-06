import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { visuallyHidden } from "@mui/utils";
import "./LegendTable.css";

const webAPI = `https://tftappbackend.onrender.com`;

const headCells = [
	{
		id: "speciesName",
		numeric: false,
		disablePadding: true,
		label: "Species Name",
	},
	{
		id: "totalCount",
		numeric: true,
		disablePadding: true,
		label: "Pick Rate",
	},
];

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
};

Row.propTypes = {
	row: PropTypes.shape({
		speciesId: PropTypes.number,
		speciesCode: PropTypes.number,
		speciesName: PropTypes.string,
		totalCount: PropTypes.number,
		defaultImg: PropTypes.string,
		variants: PropTypes.arrayOf(
			PropTypes.shape({
				variantId: PropTypes.number,
				variantCode: PropTypes.number,
				level: PropTypes.number,
				count: PropTypes.number,
				rarity: PropTypes.string,
				name: PropTypes.string,
				imgPath: PropTypes.string,
				speciesId: PropTypes.number,
			})
		),
	}).isRequired,
};

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const rarityColors = {
	Default: "#FFFFF",
	Rare: "#0070dd",
	Epic: "rgb(163, 53, 238)",
	Legendary: "#ff8000",
	Mythic: "#FF55FF",
};

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const [totalCount, setCount] = React.useState([]);
	const [order] = useState("desc");
	const [orderBy] = useState("count");
	const imageOnErrorHandler = (event) => {
		event.currentTarget.src =
			"https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?b=1&s=170667a&w=0&k=20&c=LEhQ7Gji4-gllQqp80hLpQsLHlHLw61DoiVf7XJsSx0=";
		event.currentTarget.className = "Original Image not found";
	};
	useEffect(() => {
		const url = `${webAPI}/get-total-count`;
		fetch(url, {
			method: "GET",
		})
			.then((res) => res.json().then((data) => setCount(data)))
			.catch((error) => console.log(error));
	}, []);

	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": {
						borderBottom: "unset!important",
						color: "white!important",
					},
				}}
			>
				<TableCell align="center" size="small" scope="row">
					<img
						src={row.defaultImg}
						alt="Species img"
						onError={imageOnErrorHandler}
						width={75}
						height={50}
						loading="lazy"
					/>
				</TableCell>
				<TableCell align="center">{row.speciesName}</TableCell>
				<TableCell align="center">
					{((row.totalCount / totalCount) * 100).toFixed(1)}%
				</TableCell>
				<TableCell align="center">
					<IconButton
						aria-label="expand row"
						size="small"
						style={{ color: "white" }}
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow className="variantRow">
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0, color: "white" }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" align="center">
								All Variants
							</Typography>
							<Table
								className="variant-table"
								size="small"
								aria-label="variants"
							>
								<TableHead>
									<TableRow
										sx={{
											"& > *": {
												color: "white!important",
											},
										}}
									>
										<TableCell align="left">Icon</TableCell>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">
											Level
										</TableCell>
										<TableCell align="left">
											Rarity
										</TableCell>
										<TableCell align="left">
											Pick Rate
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.variants
										.sort(getComparator(order, orderBy))
										.map((variantRow) => (
											<TableRow
												key={variantRow.variantId}
												sx={{
													"& > *": {
														color: "white!important",
													},
												}}
											>
												<TableCell align="left">
													<img
														src={variantRow.imgPath}
														alt="variant img"
														onError={
															imageOnErrorHandler
														}
														width={75}
														height={50}
														loading="lazy"
													/>
												</TableCell>
												<TableCell align="left">
													{variantRow.name}
												</TableCell>
												<TableCell
													align="left"
													sx={{
														paddingLeft: "4%",
													}}
												>
													{variantRow.level}
												</TableCell>
												<TableCell
													align="left"
													sx={{
														color:
															rarityColors[
																variantRow
																	.rarity
															] + "!important",
													}}
												>
													{variantRow.rarity}
												</TableCell>
												<TableCell align="left">
													{(
														(variantRow.count /
															row.totalCount) *
														100
													).toFixed(1)}
													%
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow
				sx={{
					"& > *": {
						color: "white!important",
					},
				}}
			>
				<TableCell align="center">Icon</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
							sx={{
								"& > *": { color: "white!important" },
							}}
						>
							<b>{headCell.label}</b>
							{orderBy === headCell.id ? (
								<Box
									color="white"
									component="span"
									sx={visuallyHidden}
								>
									{order === "desc"
										? "sorted descending"
										: "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align="center">All Variants</TableCell>
			</TableRow>
		</TableHead>
	);
}

export default function FetchLegendsTable() {
	const [species, setspecies] = useState([]);
	const [order, setOrder] = useState("desc");
	const [orderBy, setOrderBy] = useState("totalCount");
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	useEffect(() => {
		(async () => {
			const url = `${webAPI}/get-all-species`;
			fetch(url, {
				method: "GET",
			})
				.then((Response) => Response.json())
				.then((speciesFromServer) => {
					console.log(speciesFromServer);
					setspecies(speciesFromServer);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		})();
	}, []);

	return (
		<div className="legends-container">
			<TableContainer
				className="table-responsive legendTable justify-content-center align-items-center"
				component={Paper}
			>
				<Table>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{species
							.sort(getComparator(order, orderBy))
							.map((species) => (
								<Row key={species.id} row={species} />
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
