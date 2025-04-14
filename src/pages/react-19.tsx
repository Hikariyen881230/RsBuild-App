import { useActionState } from 'react';
import MyButton from '../components/my-button';
import MyInput from '../components/my-input';
import useColor from '../hooks/use-color';
import useNum from '../hooks/use-num';
import CodeBox from '../components/code-box';

type FormData = {
  account: string;
  password: string;
};

function React19() {
  const { color, setColor } = useColor();
  const { num, setNum } = useNum();
  const [state, action, isPending] = useActionState(async (prevState, form) => {
    const formData = {
      account: form.get('account') as string,
      password: form.get('password') as string,
    };
    try {
      const result = await login(formData as FormData);
      if (result.accessToken) {
        return { success: true, user: result };
      } else {
        return { error: '登入失敗，請檢查帳號密碼是否正確' };
      }
    } catch {
      return { error: '登入失敗，請檢查帳號密碼是否正確' };
    }
  }, null);

  return (
    <div className="max-w-md mx-auto mt-5">
      <div className="p-4 rounded-xl shadow-md space-y-4 border">
        <h1 className="text-center text-2xl">useActionState</h1>
        {!state?.success ? (
          <form
            action={action}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div className="w-full">
              <label htmlFor="account">帳號</label>
              <MyInput name="account" type="text" autoComplete={'username'} />
            </div>
            <div className="w-full">
              <label htmlFor="password">密碼</label>
              <MyInput
                name="password"
                type="password"
                autoComplete={'current-password'}
              />
            </div>
            <MyButton type="submit" disabled={isPending} text="登入" />
            {state?.error && (
              <span className="text-center text-red-700">{state.error}</span>
            )}
          </form>
        ) : (
          <h2 className="text-center">登入成功</h2>
        )}
      </div>
      <div className="mt-5 p-4 rounded-xl shadow-md space-y-4 border">
        <h1 className="text-center text-2xl">&apos;use&apos; API</h1>
        <div className="flex gap-3 ">
          <MyButton text="藍色" onClick={() => setColor('#007595')} />
          <MyButton
            text="綠色"
            variant={'green'}
            onClick={() => setColor('#007a55')}
          />
          <MyButton
            text="紅色"
            variant={'red'}
            onClick={() => setColor('#c10007')}
          />
        </div>
        <p
          className="transition-all"
          style={{ color: color, fontWeight: 'bold', fontSize: '20px' }}
        >
          切換文字顏色
        </p>
        <hr />
        <MyInput type="text" onChange={(e) => setNum(Number(e.target.value))} />
        <p className="text-center">目前數字：{num}</p>
      </div>
      <div className="mt-5">
        <CodeBox />
      </div>
    </div>
  );
}

export default React19;

const login = async (formData: FormData) => {
  const { account, password } = formData;
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: account,
      password: password,
      expiresInMins: 60,
    }),
    credentials: 'omit',
  }).then((res) => res.json());

  return res;
};
