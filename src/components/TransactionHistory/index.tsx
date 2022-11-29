export const TransactionHistory = () => {
	return (
		<div className='flex flex-col gap-4 px-6 py-10 bg-primary text-secondary rounded-t'>
			<div
				id='filtros'
				className='flex flex-col gap-4'>
				<div className='flex items-end'>
					<h1 className='text-4xl font-bold flex-1'>Transações</h1>
					<button className='w-24 h-10 font-bold rounded bg-secondary text-primary'>
						Filtros
					</button>
				</div>
				<div className='flex flex-row justify-between items-end gap-4'>
					<div className='flex gap-2'>
						<label className='relative'>
							<span className='absolute text-[12px] -top-2 left-2 bg-primary leading-none px-1'>
								De:
							</span>
							<input
								type='date'
								placeholder='Data inicial'
								className='p-1 h-8 border border-secondary bg-primary rounded'
							/>
						</label>
						<label className='relative'>
							<span className='absolute text-[12px] -top-2 left-2 bg-primary leading-none px-1'>
								Até:
							</span>
							<input
								type='date'
								placeholder='Data final'
								className='p-1 h-8 border border-secondary bg-primary rounded'
							/>
						</label>
					</div>
					<div className='flex gap-2'>
						<button className='w-11 h-8 font-bold rounded bg-secondary text-primary'>
							in
						</button>

						<button className='w-11 h-8 font-bold rounded bg-secondary text-primary'>
							out
						</button>
					</div>
				</div>
			</div>
			<div
				id='area de tabelas'
				className='flex flex-col gap-6 border-t border-b border-black px-1 py-4'>
				{/* mapeia registros, retorna meses */}
				<div id='mes'>
					<h2 className='text-2xl font-bold'>[Nome do Mês]</h2>
					<table>
						<tr>
							<td>
								{new Date().toDateString().slice(0, -5) + ". "}
							</td>
							<td>[seta]</td>
							<td>[@username]</td>
							<td>[R$ valor]</td>
						</tr>
					</table>
				</div>
				<div id='mes'>
					<h2 className='text-2xl font-bold'>[Nome do Mês]</h2>
					<table>
						<tr>
							<td>[data]</td>
							<td>[seta]</td>
							<td>[@username]</td>
							<td>[R$ valor]</td>
						</tr>
					</table>
				</div>
				<div id='mes'>
					<h2 className='text-2xl font-bold'>[Nome do Mês]</h2>
					<table>
						<tr>
							<td>[data]</td>
							<td>[seta]</td>
							<td>[@username]</td>
							<td>[R$ valor]</td>
						</tr>
					</table>
				</div>
				<p className='self-center'>Sem mais registros...</p>
			</div>
		</div>
	);
};
