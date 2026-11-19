import React from "react";

type UserCardProps = {
	name: string;
	email: string;
	phoneNumber: string;
};

export default function UserCard({
	name,
	email,
	phoneNumber,
}: UserCardProps) {
	return (
		<article className="user-card">
			<section className="user-card__details" aria-label="User details">
				<span className="user-card__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
						<path
							d="M4 21a8 8 0 0 1 16 0"
							stroke="currentColor"
							strokeLinecap="round"
							strokeWidth="1.8"
						/>
					</svg>
				</span>
				<div>
					<h2>{name}</h2>
					<p>{email}</p>
					<p>{phoneNumber}</p>
				</div>
			</section>
			<button className="user-card__update" type="button">
				Update
			</button>
		</article>
	);
}
