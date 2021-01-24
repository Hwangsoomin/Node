<template>
	<v-container justify="center">
		<v-card class="ma-10 pa-10" style="max-width: 500px;" outlined>
			<v-list-item class="pl-0">
				<v-list-item-content>
					<div>
						SIGN UP
					</div>
				</v-list-item-content>
			</v-list-item>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-row>
					<v-col>
						<v-text-field
							v-model="name"
							:counter="10"
							:rules="nameRules"
							label="Name"
							required
						></v-text-field>
					</v-col>

					<v-col>
						<v-select
							v-model="gender"
							:items="items"
							:rules="[v => !!v || '성별을 선택해주세요!']"
							label="성별"
							required
						></v-select>
					</v-col>
				</v-row>

				<v-row class="pa-3">
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>
				</v-row>

				<v-row class="pa-3">
					<v-text-field
						v-model="id"
						:rules="idRules"
						label="ID"
						required
					></v-text-field>
				</v-row>

				<v-row class="pa-3">
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						type="password"
						label="PASSWORD"
						required
					>
					</v-text-field>
				</v-row>

				<v-row class="justify-center">
					<v-btn
						depressed
						color="pink lighten-2"
						style="color: white;"
						v-on:click="register()"
					>
						회원가입
					</v-btn>
				</v-row>
			</v-form>
		</v-card>
		<v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
			{{ snackbar.text }}
			<v-btn justify="center" text v-on:click="snackbar.show = false">
				close
			</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	data: () => ({
		valid: true,
		name: '',
		nameRules: [v => !!v || '이름을 입력해 주세요!'],
		email: '',
		emailRules: [
			v => !!v || '이메일을 입력해 주세요!',
			v => /.+@.+\..+/.test(v) || '유효한 이메일이 아닙니다.',
		],
		id: '',
		idRules: [v => !!v || 'ID를 입력해 주세요!'],
		gender: null,
		items: ['남성', '여성'],
		password: '',
		passwordRules: [
			v => !!v || '비밀번호를 입력해 주세요!',
			v =>
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(
					v,
				) ||
				'비밀번호는 최소 하나의 문자  + 하나의 숫자 + 하나의 특수 문자 포함, 최소 6자리여야 합니다.',
		],
		snackbar: {
			show: false,
			text: '',
			color: '',
		},
	}),

	methods: {
		async register() {
			await this.$refs.form.validate();
			if (!this.valid) return;
			try {
				const result = await axios.post('/api/user/signup', {
					name: this.name,
					gender: this.gender,
					email: this.email,
					id: this.id,
					password: this.password,
				});
				if (result.status === 201) {
					this.snackbar.color = 'success';
					this.snackbar.text = '회원가입에 성공하셨습니다!';
					this.snackbar.show = true;
				}
			} catch (err) {
				this.snackbar.color = 'error';
				this.snackbar.text = '이미 사용 중인 아이디 입니다.';
				this.snackbar.show = true;
			}
		},
	},
};
</script>
