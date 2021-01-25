<template>
	<v-container fluid fill-height>
		<v-row justify="center" align="center">
			<v-card width="450" outlined>
				<v-toolbar class="pink lighten-2" outlined>
					<v-toolbar-title style="color: white;"
						><h5>로그인</h5></v-toolbar-title
					>
				</v-toolbar>
				<v-card-text>
					<div>
						<v-form v-model="valid" ref="form">
							<v-text-field
								label="ID"
								v-model="id"
								:rules="rules.id"
								required
							></v-text-field>
							<v-text-field
								label="PASSWORD"
								v-model="password"
								:rules="rules.password"
								type="password"
								required
							></v-text-field>
							<v-layout justify-center>
								<v-btn v-on:click="login()" color="pink lighten-5">Login</v-btn>
							</v-layout>
						</v-form>
					</div>
				</v-card-text>
			</v-card>
			<v-snackbar
				v-model="snackbar.show"
				:timeout="2000"
				:color="snackbar.color"
			>
				{{ snackbar.text }}
				<v-btn justify="center" text v-on:click="snackbar.show = false">
					close
				</v-btn>
			</v-snackbar>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios';
export default {
	data: () => ({
		valid: false,
		id: '',
		password: '',
		rules: {
			id: [v => !!v || 'ID를 입력해 주세요!'],
			password: [v => !!v || 'PASSWORD를 입력해 주세요!'],
		},
		snackbar: {
			show: false,
			text: '',
			color: '',
		},
	}),
	methods: {
		async login() {
			await this.$refs.form.validate();
			if (!this.valid) return;
			try {
				const result = await axios.post('/api/user/login', {
					id: this.id,
					password: this.password,
				});
				if (result.status === 201) this.$router.push('/');
			} catch (err) {
				this.snackbar.color = 'error';
				this.snackbar.text = '아이디나 비밀번호를 다시 확인해주세요.';
				this.snackbar.show = true;
			}
		},
	},
};
</script>
